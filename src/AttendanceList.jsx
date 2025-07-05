import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './AttendanceList.css';
import NavBar from './NavBar';

function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState('Present');

  const fetchData = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'attendance'));
      const data = snapshot.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setRecords(data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError("❌ Failed to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDoc(doc(db, 'attendance', id));
        setRecords(records.filter(r => r.id !== id));
      } catch (err) {
        alert("Failed to delete record.");
      }
    }
  };

  const handleEdit = (record) => {
    setEditId(record.id);
    setEditName(record.name);
    setEditStatus(record.status);
  };

  const handleEditSave = async (id) => {
    try {
      await updateDoc(doc(db, 'attendance', id), {
        name: editName,
        status: editStatus,
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("Failed to update record.");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditName('');
    setEditStatus('Present');
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h3>📋 Attendance Records</h3>

        {loading && <p>Loading attendance data...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && records.length === 0 && (
          <p>No attendance records found.</p>
        )}

        {!loading && records.length > 0 && (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>
                    {editId === record.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="attendance-input"
                        style={{ minWidth: 100 }}
                      />
                    ) : (
                      record.name
                    )}
                  </td>
                  <td>
                    {editId === record.id ? (
                      <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value)}
                        className="attendance-select"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    ) : (
                      record.status
                    )}
                  </td>
                  <td>
                    {record.timestamp
                      ? record.timestamp.toDate().toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    {editId === record.id ? (
                      <>
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleEditSave(record.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-primary me-2"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AttendanceList;