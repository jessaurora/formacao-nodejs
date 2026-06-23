// Gerador de QR Code - DIO
// Projeto Node.js - Formação DIO

const qrcode = require("qrcode-terminal");
const prompt = require("prompt");
const chalk = require("chalk");

// configuracao do prompt
prompt.message = "";
prompt.delimiter = "";

const schema = {
  properties: {
    tipo: {
      description: chalk.yellow("O que voce quer transformar em QR Code?\n1 - Link/URL\n2 - Texto\n3 - Sair\nEscolha: "),
      pattern: /^[123]$/,
      message: "Digite apenas 1, 2 ou 3",
      required: true,
    },
  },
};

const schemaConteudo = {
  properties: {
    conteudo: {
      description: chalk.cyan("Digite o conteudo: "),
      required: true,
    },
  },
};

const schemaTamanho = {
  properties: {
    tamanho: {
      description: chalk.magenta("Tamanho do QR Code (pequeno/grande): "),
      pattern: /^(pequeno|grande)$/i,
      message: 'Digite "pequeno" ou "grande"',
      required: true,
    },
  },
};

function gerarQRCode(conteudo, tamanho) {
  const small = tamanho.toLowerCase() === "pequeno";

  console.log(chalk.green("\n✅ Gerando seu QR Code...\n"));

  qrcode.generate(conteudo, { small }, function (qr) {
    console.log(qr);
    console.log(chalk.green("QR Code gerado com sucesso!"));
    console.log(chalk.gray(`Conteudo: ${conteudo}\n`));
    iniciar();
  });
}

function iniciar() {
  console.log(chalk.bold.yellow("\n🔲 ===== GERADOR DE QR CODE ====="));

  prompt.get(schema, function (err, result) {
    if (err || result.tipo === "3") {
      console.log(chalk.red("\n👋 Ate logo!"));
      process.exit(0);
    }

    const tipo = result.tipo === "1" ? "URL/Link" : "Texto";
    console.log(chalk.blue(`\nVoce escolheu: ${tipo}`));

    prompt.get(schemaConteudo, function (err2, res2) {
      if (err2) {
        console.log(chalk.red("Erro ao ler o conteudo!"));
        return;
      }

      prompt.get(schemaTamanho, function (err3, res3) {
        if (err3) {
          console.log(chalk.red("Erro ao ler o tamanho!"));
          return;
        }

        gerarQRCode(res2.conteudo, res3.tamanho);
      });
    });
  });
}

console.log(chalk.bold.green("================================="));
console.log(chalk.bold.green("   BEM VINDO AO GERADOR DE QR!  "));
console.log(chalk.bold.green("================================="));
console.log(chalk.gray("Transforme links e textos em QR Codes direto no terminal!\n"));

prompt.start({ noHandleSIGINT: false });
iniciar();
