import config from "./app/config/config";
import app from "./app";

async function main() {
    try {
        app.listen(config.port, () => {
            console.log("Tutor connect server listening on port " + config.port);
        })
    } catch (error) {
        console.log(error);
    }
};

main();