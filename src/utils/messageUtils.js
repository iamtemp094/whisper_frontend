export function groupAndSortMessages(messages) {
    const sortedMessages = [...messages].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const groups = sortedMessages.reduce((acc, message) => {
      const date = new Date(message.timestamp);
      const dateKey = date.toISOString().split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(message);
      return acc;
    }, {});

    return Object.entries(groups)
      .map(([dateStr, messages]) => ({
        date: new Date(dateStr),
        messages: messages.sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }
