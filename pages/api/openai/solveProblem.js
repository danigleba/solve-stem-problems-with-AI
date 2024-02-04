import OpenAI from "openai"

export const config = {
    maxDuration: 300
}

export default async function handler(req, res) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { images, text } = req.body
    const prompt = `The task at hand involves addressing a STEM-related problem, and it is imperative to provide a meticulous, step-by-step guide for easy comprehension. Incorporating the following math syntax for mathematical expressions is essential. Here's a comprehensive solution for the specified problem:
    First here are some examples of the math formatting required: $x^2 = 12^2 + 15^2$     $12^2 = 144$ and $15^2 = 225$  $x = \sqrt{369} \approx 19.21$   $19.21^2 \approx 12^2 + 15^2$     $19.21^2 \approx 369$     $369 \approx 144 + 225$

    - **Variables** Start by identifying the pertinent variables or parameters in the problem. For example, if dealing with a physics problem, pinpoint the relevant physical quantities involved, such as velocity, mass, or time.
    
    - **Equations**  Express the mathematical relationship governing the problem. Clearly present the equation, utilizing the math syntax provided to represent mathematical expressions.
        
    - **Completion** The step-by-step guide is the most crucial aspect. Ensure that each step is numbered, providing a clear sequence for solving the problem.
    
    - **Final result** Clearly and concisely state the final result. If the answer involves units, ensure their inclusion. Utilize the math syntax provided to present the final answer in a clear and organized manner.
    
    - **Validation** If applicable, validate the solution by checking if it adheres to any given conditions or constraints. This step guarantees the accuracy of the solution and reinforces the problem-solving process.
    
    Remember, the objective is to guide students through the problem-solving process in a manner that is accessible and educational.
    
    The problem to be solved is as follows: ${text}`

    const imagesArray = images.map((base64_image) => (
        {
            type: "image_url",
            image_url: {
                url: `${base64_image}`,
            }
        }
    ))
    const content = [
        { type: "text", text: prompt },
        ...imagesArray, 
    ]
    
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: content }],
            model: "gpt-4-vision-preview",
            temperature: 0,
            max_tokens: 4096,
          })
        res.status(200).json({ data: completion.choices[0] })
    } catch (error) {
        res.status(500).json({error: error})
    }
}