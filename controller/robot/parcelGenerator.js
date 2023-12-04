async function createParcelRobot() {
  // Function to generate a random number between min and max
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const createParcel = async () => {
    // Create senderUser and recepientUser fetching existing users from backend
    const usersRespons = await fetch(
      "https://test-goparcel.azurewebsites.net/getusers"
    );
    //After fetching users from backend, need one user as senderUser and another user as recepientUser randomly and not the same user
    const users = await usersRespons.json();
    const senderIndex = getRandomNumber(0, users.length - 1);
    let sender = users[senderIndex];
    let recipientIndex;
    let recipient;

    do {
      recipientIndex = getRandomNumber(0, users.length - 1);
      recipient = users[recipientIndex];
    } while (recipientIndex === senderIndex);
    // sender address should one of from this array ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"]}
    const senderAddress = ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"];
    const senderAddressIndex = getRandomNumber(0, senderAddress.length - 1);
    const senderadd = senderAddress[senderAddressIndex];

    // recipient address should one of from this array ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"]}
    const recepientAddress = ["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"];
    const recepientAddressIndex = getRandomNumber(
      0,
      recepientAddress.length - 1
    );
    const recepientadd = recepientAddress[recepientAddressIndex];

    const parcel = {
      parcelSize: {
        width: getRandomNumber(1, 10).toString(),
        height: getRandomNumber(1, 10).toString(),
        depth: getRandomNumber(1, 10).toString(),
        weight: getRandomNumber(1, 10).toString(),
      },
      sender: {
        name: sender.name,
        address: senderadd,
        mobile: sender.mobile,
      },
      recipient: {
        name: recipient.name,
        address: recepientadd,
        mobile: recipient.mobile,
      },
    };

    try {
      const response = await fetch(
        "https://test-goparcel.azurewebsites.net/createparcel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth_token: "parcelsender",
          },
          body: JSON.stringify(parcel),
        }
      );
      const json = await response.json();
      if (json.success) {
        console.log("Parcel created successfully");
      } else {
        console.log("Failed to create parcel");
      }
    } catch (error) {
      console.log(error);
    }
  };
  createParcel();
}

module.exports = {
  createParcelRobot,
};
