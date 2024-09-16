const yargs = require("yargs");
const notes = require("./notes");

// console.log(process.argv);
// In Node.js, process.argv is an array that contains the command-line arguments passed when the Node.js process is launched. The first two elements are always the path to the Node.js executable and the path to the JavaScript file being executed. Any additional command-line arguments will follow these two.

yargs.command({
  command: "add",
  describe: "Adds a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "update",
  describe: "Updates a note by title",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.updateNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Removes a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "Lists all notes",
  handler: function () {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Reads a note by title",
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
