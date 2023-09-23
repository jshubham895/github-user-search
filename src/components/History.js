import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './styles.css';
import User from './User';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history')) ?? [];
    setHistory(history);
  }, []);

  const deleteHistory = () => {
    localStorage.removeItem('history');
    setHistory([]);
    toast.success('Search history cleared successfully.');
  };

  return (
    <div style={{ maxWidth: '800px' }} className="container">
      <span className="title">Your Search History</span>
      {!history.length ? (
        <span style={{ color: '#9799B0', padding: '0px 20px' }}>
          Your search history is empty. Please search users to see your history
          here.
        </span>
      ) : (
        <>
          <div className="table">
            <div className="body header">
              <div>Query</div>
              <div>Result</div>
            </div>
            <div className="body content">
              {history.map((item, i) => (
                <div key={i} className="table-body">
                  <div
                    className="search-term"
                    style={{
                      padding: item.result?.length ? 0 : '20px 0px',
                    }}
                  >
                    {item.query}
                  </div>
                  <div className="result-box">
                    {item.result?.length ? (
                      item.result.map((user, i) => (
                        <User
                          key={i}
                          user={user}
                          style={{ padding: 0, justifyContent: 'flex-start' }}
                        />
                      ))
                    ) : (
                      <span style={{ color: '#B7B9C9', padding: '20px 0px' }}>
                        Search result not found{' '}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            style={{ width: 'fit-content' }}
            className="submit"
            onClick={deleteHistory}
          >
            Clear search history
          </button>
        </>
      )}
    </div>
  );
};

export default History;
