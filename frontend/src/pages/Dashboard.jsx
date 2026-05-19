import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Search, MapPin, Tag, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');

  const fetchComplaints = async (location = '') => {
    try {
      setLoading(true);
      const endpoint = location ? `/complaints/search?location=${location}` : '/complaints';
      const { data } = await API.get(endpoint);
      setComplaints(data.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComplaints(searchLocation);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/complaints/${id}`, { status });
      fetchComplaints(searchLocation); // Refresh
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'Resolved') return 'badge badge-resolved';
    if (status === 'In Progress') return 'badge badge-progress';
    return 'badge badge-pending';
  };

  const getUrgencyBadgeClass = (urgency) => {
    if (urgency === 'High') return 'badge badge-high';
    if (urgency === 'Medium') return 'badge badge-medium';
    return 'badge badge-low';
  };

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Complaints Dashboard</h1>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            style={{ width: '250px' }}
          />
          <button type="submit" className="btn btn-secondary">
            <Search size={18} />
          </button>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading complaints...</div>
      ) : complaints.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
          No complaints found.
        </div>
      ) : (
        <div className="complaint-grid">
          {complaints.map((c) => (
            <div key={c._id} className="card">
              <div className="complaint-header">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{c.title}</h3>
                <span className={getStatusBadgeClass(c.status)}>{c.status}</span>
              </div>
              
              <div style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Tag size={14}/> {c.category}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14}/> {c.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> {new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              
              <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                {c.description.length > 100 ? `${c.description.substring(0, 100)}...` : c.description}
              </p>

              {c.aiAnalysis && (
                <div className="ai-box" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  <h4>✨ AI Analysis</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>Priority:</strong> 
                    <span className={getUrgencyBadgeClass(c.aiAnalysis.urgency)}>
                      {c.aiAnalysis.urgency}
                    </span>
                  </div>
                  <div><strong>Dept:</strong> {c.aiAnalysis.suggestedDepartment}</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
                {c.status !== 'Resolved' && (
                  <>
                    {c.status === 'Pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(c._id, 'In Progress')}
                        className="btn btn-secondary" style={{ flex: 1, padding: '0.25rem' }}>
                        Mark In Progress
                      </button>
                    )}
                    <button 
                      onClick={() => handleStatusUpdate(c._id, 'Resolved')}
                      className="btn btn-primary" style={{ flex: 1, padding: '0.25rem' }}>
                      <CheckCircle size={14}/> Resolve
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
