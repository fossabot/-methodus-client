
import { Contract } from "./contract";

(async () => {

    Contract.base = "http://localhost:8090";

    const result1 = await Contract.action1(15, "roi");
    (document.getElementById("action1") as HTMLInputElement).value = JSON.stringify(result1);

    const result2 = await Contract.action2(15, "roi", 5);
    (document.getElementById("action2") as HTMLInputElement).value = JSON.stringify(result2);

    const result3 = await Contract.action3("roi", 5, 50);
    (document.getElementById("action3") as HTMLInputElement).value = JSON.stringify(result3);

    const result4 = await Contract.action4("roi", 5, 50);
    (document.getElementById("action4") as HTMLInputElement).value = JSON.stringify(result4);

    const result5 = await Contract.action5("roi", 5, 50);
    (document.getElementById("action5") as HTMLInputElement).value = JSON.stringify(result5);

})();
