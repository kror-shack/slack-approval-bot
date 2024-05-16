const approvalUpdate = (requesterId, statusText, approverId) => {
  // View to notify the requester about the approval status
  const updateView = {
    channel: requesterId,
    text: `Your approval request has been ${statusText} from <@${approverId}>.`,
  };
  return updateView;
};

module.exports = { approvalUpdate };
