// Define the contract address
const contract = "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801";

// Fetch messages using the contract
const messages = Near.view(contract, "get_messages");

// Initialize the state with default values
State.init({ text: "", textSize: 13, widgetSize: 10 });

// Function to handle text input change
const onChange = ({ target }) => {
  State.update({ text: target.value });
};

// Styled component for the chat container
const ChatContainer = styled.div`
  background-color: #000;
  color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

// Styled component for individual messages
const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2em;
`;

// Styled component for message text container
const MessageTextContainer = styled.div`
  background-color: #355;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: ${state.textSize}px;
`;

// Styled component for widget container
const WidgetContainer = styled.div`
  font-size: ${state.widgetSize}px;
`;

// Function to send a message
const sendMessage = () => {
  const text = state.text;
  Near.call(contract, "send", { text });
};

// Styled component for the send message container
const SendMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

// Styled component for font size input
const FontSizeInput = styled.input`
  width: 40px; /* Adjust the width as needed */
`;

// Styled component for the send message button
const SendMessageButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
`;

// Main JSX code
return (
  <ChatContainer>
    {/* Iterate through messages */}
    {messages.map((message) => (
      <Message key={message.id}>
        {/* Display account profile widget */}
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{
            accountId: message.author,
          }}
        />
        {/* Display message text */}
        <MessageTextContainer>{message.text}</MessageTextContainer>
        {/* Display time ago widget */}
        <WidgetContainer>
          <Widget
            src="andyh.near/widget/TimeAgo"
            props={{
              blockHeight: message.block_height,
            }}
          />
        </WidgetContainer>
      </Message>
    ))}
    <hr />
    {/* Input area for sending messages */}
    <SendMessageContainer>
      <input
        onChange={onChange}
        type="text"
        placeholder="Type your message..."
      />
      {/* Input for adjusting text size */}
      <FontSizeInput
        type="number"
        min="10"
        max="40"
        value={state.textSize}
        onChange={(event) =>
          State.update({ textSize: parseInt(event.target.value) })
        }
      />
      {/* Input for adjusting widget size */}
      <FontSizeInput
        type="number"
        min="10"
        max="40"
        value={state.widgetSize}
        onChange={(event) =>
          State.update({ widgetSize: parseInt(event.target.value) })
        }
      />
      {/* Button to send message */}
      <SendMessageButton onClick={sendMessage}>Send</SendMessageButton>
    </SendMessageContainer>
  </ChatContainer>
);
