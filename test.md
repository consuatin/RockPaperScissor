|         | Rocks |  Paper  | Scissor |
| :-----: | :---: | :-----: | :-----: |
|  Rocks  | Draw  |  Paper  |  Rocks  |
|  Paper  | Paper |  Draw   | Scissor |
| Scissor | Rocks | Scissor |  Draw   |

| f(x,y) | y = 0 | y = 1 | y = 2 |
| :----: | :---: | :---: | :---: |
| x = 0  |   -   |   1   |   0   |
| x = 1  |   1   |   -   |   2   |
| x = 2  |   0   |   2   |   -   |

| x   | y   | z   |
| --- | --- | --- |
| 0   | 2   | 0   |
| 2   | 0   | 0   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 2   | 2   |
| 2   | 1   | 2   |



    | expect(compareHands(ROCK,SCISOR)).toEqual(ROCK)   |
    | expect(compareHands(SCISOR,ROCK)).toEqual(ROCK)   |
    | expect(compareHands(ROCK,PAPER)).toEqual(PAPER)   |
    | expect(compareHands(PAPER,ROCK)).toEqual(PAPER)   |
    | expect(compareHands(PAPER,SCISOR)).toEqual(SCISOR)   |
    | expect(compareHands(SCISOR,PAPER)).toEqual(SCISOR)   |