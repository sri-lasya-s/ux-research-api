import { client } from "@api/client.gen";
import {
  studyServiceList,
  studyServiceCreate,
  studyServiceDelete,
  studyServiceSummary,
} from "@api/sdk.gen";
import type { StudyCreate } from "@api/types.gen";

client.setConfig({ baseUrl: "https://backend-ux.azurewebsites.net" });

async function runSdkOp(label: string, fn: () => Promise<any>) {
  const output = document.getElementById("output")!;
  output.textContent = "Loading...";
  try {
    const res = await fn();
    const data = res.data ?? res;
    output.textContent = `${label}\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    output.textContent = `Error: ${e}`;
  }
}

document.getElementById("btn-list")!.addEventListener("click", () => {
  runSdkOp("studyServiceList()", () => studyServiceList());
});

document.getElementById("btn-summary")!.addEventListener("click", () => {
  runSdkOp("studyServiceSummary()", () => studyServiceSummary());
});

document.getElementById("form-create")!.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const fd = new FormData(form);
  const body: StudyCreate = {
    title: String(fd.get("title")),
    methodology: fd.get("methodology") as StudyCreate["methodology"],
    status: fd.get("status") as StudyCreate["status"],
    participantCount: Number(fd.get("participantCount")),
    durationMinutes: Number(fd.get("durationMinutes")),
    researcherName: String(fd.get("researcherName")),
  };
  runSdkOp("studyServiceCreate({ body })", () => studyServiceCreate({ body }));
});

document.getElementById("btn-delete")!.addEventListener("click", () => {
  const id = (document.getElementById("delete-id") as HTMLInputElement).value.trim();
  runSdkOp("studyServiceDelete({ path: { id } })", () => studyServiceDelete({ path: { id } }));
});