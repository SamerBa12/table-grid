import Papa from "papaparse";
import { useEffect, useState } from "react";
import { DataTable, useDataTableColumns } from "mantine-datatable";
import { sortBy } from "lodash";
import dayjs from "dayjs";
import { Button, Group, TextInput } from "@mantine/core";
const DataGridDisplay = () => {
  const PAGE_SIZE = 7;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "Invoice ID",
    direction: "asc",
  });
  const [records, setRecords] = useState([]);
  const [columnNames, setColumnNames] = useState({}); // State to hold editable column names
  const key = "resize-complex-example";

  const { effectiveColumns, resetColumnsOrder } = useDataTableColumns({
    key,
    columns: [
      { accessor: "Invoice ID", title: "Invoice ID" },
      {
        accessor: "Branch",
        title: "Branch",
        // width: 60,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "City",
        title: "City",
        // width: 100,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Customer type",
        title: "Customer Type",
        // width: 120,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Gender",
        title: "Gender",
        // width: 80,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Product line",
        title: "Product Line",
        // width: 140,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Unit price",
        title: "Unit Price",
        // width: 100,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Quantity",
        title: "Quantity",
        // width: 80,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Tax 5%",
        title: "Tax (5%)",
        // width: 80,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Total",
        title: "Total",
        // width: 100,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Date",
        title: "Date",
        // width: 100,
        render: ({ Date }) => dayjs(Date).format("YYYY-MM-DD"),
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Time",
        title: "Time",
        // width: 80,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Payment",
        title: "Payment Method",
        // width: 120,
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "cogs",
        title: "COGS",
        // width: 100,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "gross margin percentage",
        title: "Gross Margin (%)",
        // width: 140,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "gross income",
        title: "Gross Income",
        // width: 100,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
      {
        accessor: "Rating",
        title: "Rating",
        // width: 80,
        textAlign: "right",
        sortable: true,
        draggable: true,
        resizable: true,
      },
    ].map((col) => ({
      ...col,
      title: (
        <EditableColumnHeader
          title={columnNames[col.accessor] || col.title}
          onTitleChange={(newTitle) =>
            setColumnNames((prev) => ({
              ...prev,
              [col.accessor]: newTitle,
            }))
          }
        />
      ),
    })),
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  useEffect(() => {
    const sortedData = sortBy(data, sortStatus.columnAccessor);
    if (sortStatus.direction === "desc") {
      sortedData.reverse();
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(sortedData.slice(from, to));
  }, [data, page, sortStatus]);

  return (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        {/* Hidden file input */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-input"
        />
        <Button onClick={() => document.getElementById("file-input").click()}>
          Choose a CSV file
        </Button>
      </div>
      <DataTable
        style={{ borderRadius: "10px", boxShadow: "0px 1px 3px 3px #0000002b" }}
        withTableBorder
        minHeight={300}
        withColumnBorders
        striped
        // fetching={fetching}
        records={records}
        storeColumnsKey={key}
        columns={effectiveColumns}
        totalRecords={data.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        noRecordsText="No records to show"
      />
      <Group justify="right" style={{ paddingTop: "20px" }}>
        <Button onClick={resetColumnsOrder}>Reset Column Order</Button>
      </Group>
    </div>
  );
};

const EditableColumnHeader = ({ title, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const handleEdit = () => setIsEditing(true);
  const handleBlur = () => {
    setIsEditing(false);
    onTitleChange(inputValue);
  };

  return (
    <div>
      {isEditing ? (
        <TextInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          styles={{
            input: { padding: 0, fontSize: "inherit", fontWeight: "inherit" },
          }}
        />
      ) : (
        <span onClick={handleEdit} style={{ cursor: "pointer" }}>
          {title}
        </span>
      )}

      <div style={{ fontSize: "smaller", color: "gray", marginTop: 4 }}>
        <hr />
        statistics
      </div>
    </div>
  );
};

export default DataGridDisplay;
