const fetch = require("node-fetch");


export async function handler(event) {
  try {
    const { email } = JSON.parse(event.body);

    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = 2; // Replace with your Brevo list ID

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID]
      })
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Subscribed successfully!" })
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || "Subscription failed" })
      };
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error: " + error.message })
    };
  }
}

