/**
 
------------------------
field:
------------------------

field is: 15 blocks wide, 26 blocks long:
- end zones
- wide zones
- line of scrimmage

------------------------
game:
------------------------

Game is two halves, 8 turns per team
One team kicks off to start each half.

player statuses:
on field, on bench, injured, death

on field 11 players each

Dices:
block dice (push, skull, pow)
D6

Players can get:
    -Knocked down
    -Stunned (miss a turn)
    -KO’d (may recover later)
    -Injured (removed for the rest of the match or even permanently)
    -Injuries and casualties affect team management between matches in a league.


    The flow:

🧩 Pre-Match Sequence
1️⃣ Determine who kicks and who receives

At the start of the game, both coaches roll a D6.

The higher roll wins the coin toss.

The winner chooses whether to:

Kick (go first on defense), or

Receive (go first on offense).

2️⃣ Set up the teams on the pitch

The kicking team always sets up first.

Kicking team setup:

They arrange their 11 players anywhere on their half of the pitch.

Restrictions:

At least 3 players must be placed on the Line of Scrimmage (center line).

No more than 2 players in each Wide Zone.

The rest can be positioned anywhere else on their half.

Receiving team setup:

After seeing the kicker’s formation, the receiving coach sets up their own 11 players on their half.

The same positioning rules apply.

The receiving team knows where the ball will be kicked only after setup, so they position to handle the kickoff.

3️⃣ Kickoff

The kicking coach places the ball anywhere in the receiving team’s half.

Then a D6 and D8 are rolled to scatter the ball (direction and distance).

The Kick-Off Table is rolled (2D6) to see if any special events happen — e.g.:

“Blitz!” – defense gets a surprise move before the offense starts!

“Perfect Defence” – defense can reposition.

“High Kick” – a receiving player can catch the ball right away.

After that, the ball lands — if it’s not caught, it bounces one square in a random direction.

4️⃣ First Turn Begins

The receiving team always takes the first turn.

They try to pick up the ball, form a cage, and advance toward the opponent’s end zone.

5️⃣ After a Touchdown

Teams reset on their halves for another kickoff.

The team that was just scored against receives the next kickoff (like real football).

⚔️ Quick Example

Both coaches roll — you win the toss and choose to receive.

Your opponent (the kicker) deploys first, placing 3 heavy players on the line and the rest spread defensively.

You deploy second — your thrower, catchers, and a “cage core” of blockers ready to pick up the ball.

The opponent kicks → scatter + kickoff event → ball lands near your backfield.

Your turn begins: you move your players, try to pick up the ball, form a cage, and start advancing.


-Declare which player you’re activating.
-Perform their action (move, block, etc.).
-Resolve dice rolls and results.
-Move to the next player.
-If a turnover occurs → opponent’s turn starts.
-After 8 turns per team → halftime, then repeat for the second half.

------------------------
actions:
------------------------

During your team’s turn, you can activate your players one by one to perform actions like:

Move (up to their MA)

Block (attack an adjacent opponent)

Blitz (move and block once per turn)

Pass (throw the ball)

Hand-off (give the ball to a teammate)

Foul (try to injure a downed opponent)

BUT — if you fail a roll (for example, drop the ball, trip, or lose a block), it causes a turnover, and your turn ends immediately.

------------------------
players:
------------------------

player stats:

name,

number,

race,

type: Lineman, Blitzer, Thrower, Catcher, Big Guy, Star player

stat line:

    MA (Movement Allowance) – how many squares you can move.
    ST (Strength) – affects blocking.
    AG (Agility) – affects dodging, picking up, and catching.
    PA (Passing Ability) – used for passing rolls.
    AV (Armor Value) – how hard they are to injure.

special skills: (array)

player statuses:
    ready : boolean
    placed: on field, on bench, injured, death

location: 
    x and y

scores:

    touchdowns,
    kills,
    blocks,
    interceptions,
    passes

 */