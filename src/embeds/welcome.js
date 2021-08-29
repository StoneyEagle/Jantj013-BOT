
module.exports = (user) => {
  return {
    title: `👋Hi ${user.username}, Welcome in the Jantj013 Discord server.`,
    description: `\nWe are delighted that you joined our Discord server.\nIf you have any questions, our @Moderator's are happy to help!`,
    color: 50222,
    timestamp: new Date(),
    footer: {
      icon_url: "https://cdn.discordapp.com/widget-avatars/wUwweCk1MmjxFjNBqyrwZl1PVQ22-pLnIS4FNS6EAVM/NrpElw7D8R1PY0CCY71i-CdIml7RYi5LpH0Q_gbUruqAMMnoIRLasMpHtP95JSIRiIE_ct7vHBa1GOEUOgNs1rbxhP2On58pfwaLB7lHCrjgz7TP9o0DkPHBXqc5IWtnA1BeBLO0Q2LLSA",
      text: "Jantj013 | Welcome."
    },
    thumbnail: {
      url: "https://cdn.discordapp.com/widget-avatars/wUwweCk1MmjxFjNBqyrwZl1PVQ22-pLnIS4FNS6EAVM/NrpElw7D8R1PY0CCY71i-CdIml7RYi5LpH0Q_gbUruqAMMnoIRLasMpHtP95JSIRiIE_ct7vHBa1GOEUOgNs1rbxhP2On58pfwaLB7lHCrjgz7TP9o0DkPHBXqc5IWtnA1BeBLO0Q2LLSA"
    },
    fields: [
      {
        name: "***Help! I don't see any channels?***",
        value: "Please read the rules in #Rules.\n\n"
      },
      // {
      //   name: "If you've read everything and you're OK with them, click the ✅ and get access to the server.",
      //   value: "."
      // }
    ]
  }
};
