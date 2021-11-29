var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Api_Setup {
    constructor(client) {
        this.name = 'api_setup';
        this.client = client;
        this.type = "sekai";
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.client;
            client.loadModules();
            console.log("API ready");
            setInterval(function () {
                client.sekaiApi.loadAssets();
            }, 3600000);
        });
    }
}
module.exports = Api_Setup;
