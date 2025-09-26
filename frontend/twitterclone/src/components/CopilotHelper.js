import React from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const CopilotHelper = () => {
  return (
    <div className="relative z-50">
      <CopilotPopup
        defaultOpen={false}
        // Main Labels and Messages
        labels={{
          title: "Echo AI Assistant 🚀",
          initial:
            "Hey there! 👋 I'm your Echo AI assistant.\n\n I can help you:\n\n• Write engaging tweets\n• Suggest trending hashtags\n• Create thread ideas\n• Improve your content\n\n\nWhat would you like to work on today?",
          placeholder: "Ask me anything about your tweets...",
          submit: "Send",
          inputLabel: "Message",
          responsePrefix: "Echo AI:",

          thinking: "Thinking... 🤔",
          typing: "Typing...",
          error: "Oops! Something went wrong. Please try again.",
          retry: "Try again",
          stop: "Stop",
          copy: "Copy",
          copied: "Copied!",

          headerTitle: "Echo AI Assistant",
          headerSubtitle: "Your Twitter content companion",
        }}
        instructions="You are Echo AI, a helpful assistant for a Twitter clone called Echo. Help users create engaging tweets, suggest hashtags, improve their content, and provide social media best practices. Be friendly, creative, and concise in your responses. Use emojis when appropriate to make interactions more engaging."
        appearance={{
          backdropBlur: "lg",
          blur: "md",
          background:
            "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900",

          // Text styling
          textColor: "text-gray-800 dark:text-gray-100",
          primaryColor: "text-blue-600 dark:text-blue-400",

          // Borders and shadows
          border: "border-2 border-blue-200 dark:border-blue-700",
          shadow: "shadow-2xl shadow-blue-500/20",

          // Spacing and layout
          divider: "divide-blue-200 dark:divide-blue-700",
          radius: "rounded-2xl",

          // Chat bubble styling
          userMessageBackground: "bg-blue-500 text-white",
          assistantMessageBackground: "bg-white dark:bg-gray-800",

          // Input styling
          inputBackground: "bg-white dark:bg-gray-800",
          inputBorder: "border-blue-300 dark:border-blue-600",
          inputFocus: "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        }}
        // Keyboard shortcuts
        shortcuts={[
          {
            name: "Open Echo AI",
            description: "Opens the Echo AI assistant",
            keys: ["control", "k"],
          },
          {
            name: "Quick Tweet Help",
            description: "Get quick tweet suggestions",
            keys: ["control", "shift", "t"],
          },
          {
            name: "Hashtag Suggestions",
            description: "Get hashtag recommendations",
            keys: ["control", "shift", "h"],
          },
        ]}
        // Button customization
        buttonPosition="bottom-right"
        buttonClassName="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-110 transition-all duration-300 animate-pulse z-50"
        // Chat window sizing
        width="400px"
        height="600px"
        // Additional configurations
        showResponseTime={true}
        enableTextToSpeech={false}
        enableSpeechToText={false}
        // Context and behavior
        contextCategories={[
          "twitter",
          "social-media",
          "content-creation",
          "hashtags",
          "engagement",
        ]}
        // Hit enter to send
        hitEnterToSubmit={true}
        // Show thinking indicator
        showThinkingIndicator={true}
        // Custom welcome actions (quick start buttons)
        welcomeActions={[
          {
            title: "Write a Tweet 📝",
            description: "Get help writing an engaging tweet",
            action: "Help me write a tweet about",
          },
          {
            title: "Suggest Hashtags #️⃣",
            description: "Get trending hashtag suggestions",
            action: "Suggest hashtags for my tweet about",
          },
          {
            title: "Create a Thread 🧵",
            description: "Help create a Twitter thread",
            action: "Help me create a thread about",
          },
          {
            title: "Improve Content ✨",
            description: "Make my tweet more engaging",
            action: "Improve this tweet:",
          },
        ]}
        // Custom header
        renderHeader={() => (
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Echo AI Assistant</h3>
              <p className="text-blue-100 text-sm">
                Ready to boost your tweets!
              </p>
            </div>
            <div className="ml-auto">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
        )}
        renderFooter={() => (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-b-2xl border-t">
            <p className="text-xs text-gray-500 text-center">
              💡 Tip: Use Ctrl+K to quickly open me anywhere!
            </p>
          </div>
        )}
      />
    </div>
  );
};

export default CopilotHelper;
