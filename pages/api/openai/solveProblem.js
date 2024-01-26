import OpenAI from "openai"

export const config = {
    maxDuration: 300
}

export default async function handler(req, res) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})
    const { images, text } = req.body
    const prompt = `You are an expert teacher in all STEM fields like math, physics, chemistry, engineering... Your job is to teach college students how to solve problems in an easy-to-understand, organized and friendly way. You are going to be provided with STEM problems in text or images. The images will either be the problem or the context for the problem. Take both the text and images into consideration and reply with a step-by-step, detailed guide on how to solve the problem. Feel free to use emojis. Always reply in the language the problem is written. The problem you have to solve is this: ${text}`
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