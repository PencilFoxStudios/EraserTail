import {EraserTailClient} from '../index';
test('Log test!', () => {





    const ET = new EraserTailClient({
      APPLICATION_NAME: "TEST_APP",
      APPLICATION_NAME_HUMAN: "Test App",
      APPLICATION_COLOR_PRIMARY: "#F16523",
      APPLICATION_COLOR_SECONDARY: "#373737",
      APPLICATION_PREFIX: "TEST >> ",
      APPLICATION_LOGGING_STYLES: null,
      APPLICATION_ICON: "https://media.discordapp.net/attachments/1028722861428441098/1031362596110082149/pencilfox_icon.png",
      APPLICATION_SERVICES: [
        {
          SERVICE_NAME: "SERVER1",
          SERVICE_NAME_HUMAN: "Server 1",
          SERVICE_STATUS: "UP"
        },
        {
          SERVICE_NAME: "SERVER2",
          SERVICE_NAME_HUMAN: "Server 2",
          SERVICE_STATUS: "UP"
        }
      ],
      LOG_TO_CLOUD: true,
      AUTO_HEARTBEAT: true,
      AUTO_HEARTBEAT_INTERVAL: 5000
    })
    setInterval(() => {
      ET.updateService("SERVER1", "DOWN")
    }, 2500)
    setInterval(() => {
      ET.updateService("SERVER1", "LIMITED")
    }, 5000)
    ET.log("Info", "TESTING!!!", "Hello Datadog!")
    ET.log("Error", "EEEEE!!!", "EEEE Datadog!")

    ET.log("Warn", "FRICK!!!", "Hello DATAATADDDGG!")
    ET.log("EraserTail Debug", "Ah bug.", "Debug!")
    
    ET.log("Crash", "Ah crud.", "I crashed.")
    throw new Error('Boom!')


    // expect(Greeter('Carl')).toBe('Hello Carl');
  });