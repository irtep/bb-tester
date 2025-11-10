import React from 'react';

const Instructions: React.FC = (): React.ReactElement => {

    return (
        <div>
            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
                <h3 className="font-bold mb-2">How to Play</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Click your players to select them and see available actions</li>
                    <li>• <strong>Move:</strong> Click yellow squares to move (dodge rolls near opponents)</li>
                    <li>• <strong>Block:</strong> Attack adjacent opponent</li>
                    <li>• <strong>Blitz:</strong> Move and block (once per turn)</li>
                    <li>• <strong>Pass:</strong> Throw ball to teammate (once per turn)</li>
                    <li>• <strong>Hand-off:</strong> Give ball to adjacent teammate</li>
                    <li>• <strong>Foul:</strong> Injure downed opponent (once per turn)</li>
                    <li>• Pick up the ball by moving onto it (requires agility check)</li>
                    <li>• Score by reaching opponent's end zone with the ball</li>
                </ul>
            </div>
        </div>
    );
}

export default Instructions;