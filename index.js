require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

// Crea una instancia del cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Necesario para acceder a los servidores (guilds)
    GatewayIntentBits.GuildMessages, // Necesario para leer mensajes en canales de texto
    GatewayIntentBits.MessageContent, // Necesario para leer el contenido de los mensajes
  ],
});

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  console.log("LLego mensaje", message);
  // Verifica si el mensaje es en el canal correcto y si lo enviaste tú
  if (
    message.channel.id === process.env.ID_DEL_CANAL &&
    message.author.id === process.env.DISCORD_USER_ID
  ) {
    const respuesta = message.content;
    console.log("respuesta", respuesta);
    // Envía la respuesta a n8n a través de un webhook
    try {
      await axios.post(process.env.N8N_WEBHOOK_URL_PROD, { respuesta });
      console.log("Respuesta enviada a n8n");
    } catch (error) {
      console.error("Error al enviar la respuesta a n8n:", error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);