import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const steps = [
  {
    id: "0",
    message: "Hey! How can I assist you today?",
    trigger: "1",
  },
  {
    id: "1",
    options: [
      {
        value: 1,
        label: "Suggest me some best places to visit in Pakistan",
        trigger: "suggest",
      },
      { value: 2, label: "Search for hotels", trigger: "search" },
      { value: 3, label: "Book a hotel", trigger: "book" },
      { value: 4, label: "Cancel a booking", trigger: "cancel" },
      { value: 5, label: "Other inquiries", trigger: "other" },
    ],
  },
  {
    id: "suggest",
    message:
      "Sure! Here are some of the best places to visit in Pakistan: Lahore, Islamabad, Karachi, Murree, and Hunza Valley.",
    end: true,
  },
  {
    id: "search",
    message: "You selected 'Search for hotels'. Please provide more details.",
    end: true,
  },
  {
    id: "book",
    message: "You selected 'Book a hotel'. Please provide more details.",
    end: true,
  },
  {
    id: "cancel",
    message: "You selected 'Cancel a booking'. Please provide more details.",
    end: true,
  },
  {
    id: "other",
    message: "You selected 'Other inquiries'. Please provide more details.",
    end: true,
  },
];

const theme = {
  background: "#C9FF8F",
  headerBgColor: "#0071c2",
  headerFontSize: "20px",
  botBubbleColor: "#0F3789",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FF5733",
  userFontColor: "white",
};

const config = {
  floating: true,
};

function Chat() {
  return (
    <div className="Chat">
      <ThemeProvider theme={theme}>
        <ChatBot headerTitle="Swift Stay" steps={steps} {...config} />
      </ThemeProvider>
    </div>
  );
}

export default Chat;
