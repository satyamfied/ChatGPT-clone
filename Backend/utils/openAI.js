import "dotenv/config";

const getOpenAIResponse = async (message) => {
    const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    })
  };

  try{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions" , options);
    const data = await response.json();
    // console.log(data.choices[0].message.content);
    return data.choices[0].message.content; //reply from openAI
  }catch(error){
    console.log(error);
    res.status(500).send("Error occurred");
  }
}