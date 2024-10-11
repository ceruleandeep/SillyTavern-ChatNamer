# SillyTavern Chat Namer

Adds a tool for your bot/agent/character to use, that sets the name of the current chat.

You won't believe it's not ChatGPT!

<img width="671" alt="Chat Namer screenshot" src="https://github.com/user-attachments/assets/be06282a-c4ad-4ea7-ac5e-0d940dccd8ae">

## Features

*Describe some of the main selling points of your extension.*

## Installation and Usage

### Installation

*In most cases, this should just be using ST's inbuilt extension installer.* 

### Usage

The tool is enabled for all chats except the anonymous Assistant chat, which does not have a name.

To encourage the bot to use it, you could add something like this to the prompt:

```
{{char}} always updates the chat title when they know what the chat is about.
```
## Remarks

* In testing, GPT-4o, Sonnet, and Mistral Nemo (via Ollama) were all happy to use the tool when prompted as above.

* It is not reasonable to expect the bot to use the tool without some kind of prompt, because setting the chat title is not part of a normal CoT for answering the user's questions.

* A symmetric tool GetChatTitle for getting the chat name is implemented but not enabled by default, because local LLMs tend to want to use it instead of, in parallel with, or prior to SetChatTitle. All of these things are very unreliable with Ollama. 

* The return values of both GetChatTitle and SetChatTitle are deliberately identical to the calling format for SetChatTitle, on the theory that this helps the less-capable LLMs to use SetChatTitle properly. Given the current state of Ollama tool calling, this is entirely a moot point.

## Prerequisites

Must be using Chat Completion with a compatible model and completion API.

Must have tool calling (aka function calling) enabled in Chat Completion presets.

## Support and Contributions

If you know, you know.

## License

AGPL-3.0
