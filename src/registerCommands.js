require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "help",
    description: "Comandos do Bot",
  },
  {
    name: "mapa-mundo",
    description: "Mapa do Mundo Conhecido de Carphanaum",
  },
  {
    name: "mapa-jazirat",
    description: "Mapa de Jazirat",
  },
  {
    name: "virtudes-heroicas",
    description: "Tabela de Virtudes Heroicas",
  },
  {
    name: "avancos",
    description: "Tabela de como gastar os Pontos de Aventura",
  },
  {
    name: "heroismo",
    description: "Tabela de Heroismo",
  },
  {
    name: "pontos-de-aventura",
    description: "Tabela de Pontos de Abertura",
  },
  {
    name: "efeitos-magicos",
    description: "Tabala de Efeitos Mágicos",
  },
  {
    name: "detectar-magia",
    description: "Tabela de Modificadores de Detectar Mágia",
  },
  {
    name: "dificuldade-magia",
    description: "Tabela de Modificadores de Dificuldade Mágia",
  },
  {
    name: "dificuldade-quiromancia",
    description: "Tabela de Modificadores de Dificuldade de Quiromancia",
  },
  {
    name: "venenos",
    description: "Tabela de Venenos",
  },
  {
    name: "riqueza",
    description: "Tabela de Riqueza",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Comandos registrados :)");
  } catch (error) {
    console.log(`Deu merda ai mano, desculpa :(\n ${error}`);
  }
})();
