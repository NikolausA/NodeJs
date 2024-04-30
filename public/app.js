document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => {
      e.target.closest("li").remove();
    });
  } else if (e.target.dataset.type === "edit") {
    const id = e.target.dataset.id;
    const li = e.target.closest("li");
    const innerText = e.target.closest("li").innerText;
    const title = innerText.split("\n")[0];
    const buttons = li.childNodes[1];
    const newTitle = prompt("Type new title", title);
    if (newTitle && newTitle !== title) {
      update(id, newTitle).then(() => {
        li.innerHTML = "";
        li.append(newTitle, buttons);
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function update(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title }),
  });
}
