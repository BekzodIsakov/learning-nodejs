# Notes app in Node.js

All notes are saved inside _notes.json_.
[Yargs](https://www.npmjs.com/package/yargs) package is used to add commands to
create, read, list, and delete notes.  
### Before running the app, install node modules:  
`npm install`

## Adding a new note

### command:

`node index.js add --title="Lunch" --body="Have lunch at 1.30"`

### result:

_notes.json_  
` [ { "title": "Lunch", "body": "Have lunch at 1.30" } ]`

## Removing a note by title

### command:

`node index.js remove --title="Lunch"`

### result:

_notes.json_  
`[]`

## Listing all notes

_notes.json_  
`[ { "title": "Lunch", "body": "Have lunch at 1.30" }, { "title": "Meeting", "body": "Online meeting" } ]`

### command:

`node index.js list`

### result:

{ "title": "Lunch", "body": "Have lunch at 1.30" },  
{"title":"Meeting", "body": "Online meeting" }

## Read a single note by title

_notes.json_  
`[ { "title": "Lunch", "body": "Have lunch at 1.30" }, { "title": "Meeting", "body": "Online meeting" } ]`

### command:

`node index.js read --title="Lunch"`

### result:

{ "title": "Lunch", "body": "Have lunch at 1.30" }

**add update and completed list completed list incompleted**
