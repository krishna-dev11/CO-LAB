export const isMemberOfTeam = (team, userId) => {
  return team.members.some((member) => {
    return member._id.toString() === userId.toString();
  });
};
