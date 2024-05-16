const approvalResponse = (statusText, requesterId) => {
  // View to respond to the approver's action
  const requestResponseView = {
    text: `You have ${statusText} the approval request from <@${requesterId}>.`,
  };

  return requestResponseView;
};

module.exports = { approvalResponse };
