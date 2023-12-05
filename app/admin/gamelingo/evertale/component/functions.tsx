async function deleteHandler() {
  const data = document.querySelectorAll<HTMLInputElement>("input");
  const filter = [].filter.call(data, (el: HTMLInputElement) => {
    return el.checked;
  });

  const selected = Array.from(filter).map((select: HTMLInputElement) => {
    return select.name;
  });

  try {
    const allow = confirm("Yakin ingin hapus data yang dipilih?");
    if (!allow) {
      return;
    }
    const res = await fetch("http://localhost:3000/api/gamelingo/evertale", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected, select: "characters" }),
      cache: "no-cache",
    });

    const data = await res.json();

    if (data.status === "belum pilih data") {
      alert(data.msg);
      return;
    } else {
      alert(data.msg);
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function getData() {
  try {
    // setLoading(true);
    const res = await fetch("http://localhost:3000/api/gamelingo/evertale", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const charName = [];
    for (const char of data.chars.chars) {
      const name = char.charStatus.charName;

      charName.push(name);
    }

    return charName;

    // setdataInit(charName.sort());
    // setCharacters(charName.sort());
  } catch (error) {
    console.error(error);
  } finally {
    // setLoading(false);
  }
}

export { deleteHandler, getData };
