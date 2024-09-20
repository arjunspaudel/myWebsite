import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const GameScoreDialog = ({ isOpen, onClose }) => {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : [
      { id: 1, name: 'Player 1', scores: [] },
      { id: 2, name: 'Player 2', scores: [] },
      { id: 3, name: 'Player 3', scores: [] },
      { id: 4, name: 'Player 4', scores: [] },
    ];
  });
  const [rounds, setRounds] = useState(() => {
    const savedRounds = localStorage.getItem('rounds');
    return savedRounds ? parseInt(savedRounds) : 4;
  });
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editingPlayerName, setEditingPlayerName] = useState('');
  const [showClearWarning, setShowClearWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('rounds', rounds.toString());
  }, [players, rounds]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (players.some(player => player.scores.some(score => score !== 0))) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [players]);

  const addPlayer = () => {
    let newPlayerName = prompt("Enter new player's name:");
    if (newPlayerName) {
      while (players.some(player => player.name.toLowerCase() === newPlayerName.toLowerCase())) {
        newPlayerName = prompt("This name already exists. Please enter a different name:");
        if (!newPlayerName) return; // User cancelled
      }
      setPlayers(prevPlayers => [...prevPlayers, { id: Date.now(), name: newPlayerName, scores: [] }]);
    }
  };

  const addRound = () => {
    setRounds(prevRounds => prevRounds + 1);
  };

  const updateScore = useCallback((playerId, roundIndex, score) => {
    const numericScore = score === '' ? '' : parseFloat(score);
    if (score !== '' && isNaN(numericScore)) return; // Ignore non-numeric input

    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.id === playerId) {
        const newScores = [...player.scores];
        newScores[roundIndex] = numericScore;
        return { ...player, scores: newScores };
      }
      return player;
    }));
  }, []);

  const calculateTotal = useCallback((scores) => {
    const total = scores.reduce((sum, score) => sum + (score || 0), 0);
    return Number.isInteger(total) ? total.toString() : total.toFixed(2);
  }, []);

  const startEditingName = (playerId, playerName) => {
    setEditingPlayerId(playerId);
    setEditingPlayerName(playerName);
  };

  const finishEditingName = () => {
    if (editingPlayerId !== null) {
      const newName = editingPlayerName.trim();
      if (newName === '') {
        alert("Player name cannot be empty.");
        return;
      }
      if (players.some(player => player.id !== editingPlayerId && player.name.toLowerCase() === newName.toLowerCase())) {
        alert("This name already exists. Please choose a different name.");
        return;
      }
      setPlayers(prevPlayers => prevPlayers.map(player =>
        player.id === editingPlayerId ? { ...player, name: newName } : player
      ));
      setEditingPlayerId(null);
      setEditingPlayerName('');
    }
  };

  const clearScorecard = () => {
    setPlayers(prevPlayers => prevPlayers.map(player => ({ ...player, scores: [] })));
    setRounds(4);
    localStorage.removeItem('players');
    localStorage.removeItem('rounds');
    setShowClearWarning(false);
  };

  const sortedPlayers = [...players].sort((a, b) => parseFloat(calculateTotal(b.scores)) - parseFloat(calculateTotal(a.scores)));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Game Score</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Player</th>
              {[...Array(rounds)].map((_, index) => (
                <th key={index} className="border p-2">Round {index + 1}</th>
              ))}
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(player => (
              <tr key={player.id}>
                <td className="border p-2">
                  {editingPlayerId === player.id ? (
                    <input
                      type="text"
                      value={editingPlayerName}
                      onChange={(e) => setEditingPlayerName(e.target.value)}
                      onBlur={finishEditingName}
                      onKeyPress={(e) => e.key === 'Enter' && finishEditingName()}
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center">
                      <span>{player.name}</span>
                      <button onClick={() => startEditingName(player.id, player.name)} className="ml-2 text-blue-500">
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </td>
                {[...Array(rounds)].map((_, index) => (
                  <td key={index} className="border p-2">
                    <input
                      type="number"
                      className="w-full"
                      value={player.scores[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          updateScore(player.id, index, value);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (!/[0-9.]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      min="0"
                      step="0.01"
                    />
                  </td>
                ))}
                <td className="border p-2 font-bold">{calculateTotal(player.scores)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button onClick={addPlayer} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> Add Player
          </button>
          <button onClick={addRound} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> Add Round
          </button>
          <button onClick={() => setShowClearWarning(true)} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
            <FaTrash className="mr-2" /> Clear Scorecard
          </button>
        </div>
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>

        {showClearWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Clear Scorecard</h3>
              <p className="text-red-500 mb-4">Are you sure you want to clear the scorecard? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowClearWarning(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                <button onClick={clearScorecard} className="bg-red-500 text-white px-4 py-2 rounded">Clear</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScoreDialog;
