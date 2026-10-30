function Table({ children }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        {children}
      </table>
    </div>
  );
}

export default Table;