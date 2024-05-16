const approvalConfirmation = (requesterId, approverId) => {
  //view to notify the requester that the approval has been requested
  const approvalConfirmationView = {
    channel: requesterId,
    text: `Your approval request has been sent to <@${approverId}>.`,
  };
  return approvalConfirmationView;
};

module.exports = { approvalConfirmation };
