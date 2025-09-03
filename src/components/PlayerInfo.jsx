import React from 'react';
const getRank = (rp) => {
    if (rp < 100)
        return { name: 'Novice', color: 'text-gray-400' };
    if (rp < 300)
        return { name: 'Adept', color: 'text-green-400' };
    if (rp < 700)
        return { name: 'Expert', color: 'text-blue-400' };
    if (rp < 1200)
        return { name: 'Master', color: 'text-purple-400' };
    return { name: 'Grandmaster', color: 'text-yellow-400' };
};
const PlayerInfo = ({ player, color, isTurn }) => {
    const colorName = color === 'w' ? 'White' : 'Black';
    const turnIndicator = isTurn ? 'border-green-500' : 'border-gray-700';
    const isRankedPlayer = player.score.rankPoints !== undefined;
    const rank = isRankedPlayer ? getRank(player.score.rankPoints) : null;
    return (<div className={`p-3 bg-gray-800 rounded-lg border-2 ${turnIndicator} transition-all`}>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden border-2 border-gray-600">
                    {player.avatar ? (<img src={player.avatar} alt={`${player.name}'s avatar`} className="w-full h-full object-cover"/>) : (<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 m-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>)}
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold truncate text-gray-100">{player.name}</h3>
                        {isRankedPlayer && rank && (<div className="text-xs sm:text-sm flex-shrink-0 ml-2 text-right">
                                <span className={`${rank.color} font-semibold`}>{rank.name}</span>
                                <span className="text-gray-400 hidden sm:inline"> ({player.score.rankPoints} RP)</span>
                            </div>)}
                    </div>
                    <p className="text-sm text-gray-400">{colorName}</p>
                </div>
            </div>

            <div className="flex justify-between text-sm text-gray-200 mt-2">
                <span>Wins: <span className="font-semibold">{player.score.wins}</span></span>
                <span>Losses: <span className="font-semibold">{player.score.losses}</span></span>
                <span>Draws: <span className="font-semibold">{player.score.draws}</span></span>
            </div>
        </div>);
};
export default PlayerInfo;
