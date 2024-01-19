export function ComparingData<T>({ subfield, oldCS, newCS, dataFor, title }: Evertale.Utils.ComparingDataProps<T>) {
  if (!subfield) {
    throw new Error("SubField tidak ada");
  }

  const renderContent = (value: T[keyof T]) => (
    <p className={oldCS[subfield] === newCS[subfield] ? "" : "bg-cyan-500"}>
      <strong>{title} : </strong>
      {value !== null && value !== undefined ? (Array.isArray(value) ? value.join(", ") : String(value)) : ""}
    </p>
  );

  if (dataFor === "new") {
    return renderContent(newCS[subfield]);
  }

  if (dataFor === "old") {
    return renderContent(oldCS[subfield]);
  }

  return null;
}
