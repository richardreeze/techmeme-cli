const { Command, flags } = require("@oclif/command");
const Parser = require("rss-parser");
const ora = require("ora");

const parser = new Parser();

class TechmemeCliCommand extends Command {
  async run() {
    const spinner = ora(`Fetching Techmeme's latest news...\n\n`).start();

    const feed = await parser.parseURL("https://techmeme.com/feed.xml");

    var articleNumber = 1;

    feed.items.forEach(article => {
      this.log(articleNumber + ". " + article.title + "\n");
      articleNumber++;
    });

    spinner.succeed("Done!");
  }
}

TechmemeCliCommand.description = `Describe the command here
...
Extra documentation goes here
`;

TechmemeCliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" })
};

module.exports = TechmemeCliCommand;
