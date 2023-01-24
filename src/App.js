import {Component} from 'react'
import styled from 'styled-components'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
]

const BgContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #223a5f;
  min-height: 100vh;
  color: #fff;
  padding: 20px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  > button {
    cursor: pointer;
    margin-top: 1rem;
    align-self: flex-end;
    height: 30px;
    padding: 8px;
    border-radius: 8px;
    border: none;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #fff;
    border-radius: 12px;
    align-items: center;
    padding: 1.5rem;
    & > ul {
      list-style: none;
      padding: 0;
      font: 600 18px/22px 'Roboto';
      & > h1:nth-child(2) {
        margin-block: 0.45rem;
      }
    }
    & > p {
      width: 120px;
      height: 100px;
      background-color: #fff;
      border-radius: 12px;
      color: black;
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-inline: auto;
      font-size: 20px;
      font-weight: 600;
      font-family: 'Roboto';
    }
  }
`

const GameContainer = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  margin-block: 2.25rem;
  & > div {
    display: flex;
    justify-content: center;
    width: 650px;
    > button {
      background-color: transparent;
      border: none;
      width: 100%;
      & > img {
        width: 65%;
        cursor: pointer;
      }
    }
  }
`

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    cursor: pointer;
    height: 40px;
    padding-inline: 10px;
    border-radius: 12px;
    border: none;
  }
`

const RuleContainer = styled.div`
  & svg {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 4px;
    top: 4px;
    z-index: 5;
    fill: #223a5f;
    cursor: pointer;
  }
  position: relative;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  height: 650px;
  width: 80%;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
`

const ViewStatus = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    text-align: center;
    width: 30%;
    & > img {
      width: 100%;
    }
  }
`

const winList = ['SCISSORS PAPER', 'PAPER ROCK', 'ROCK SCISSORS']

const drawList = ['SCISSORS SCISSORS', 'PAPER PAPER', 'ROCK ROCK']

class App extends Component {
  state = {
    user: '',
    opponent: '',
    score: 0,
    win: '',
    greetText: '',
    viewStatus: false,
    viewRules: false,
  }

  componentDidMount() {
    this.randomOpponentPick()
  }

  randomOpponentPick = () => {
    this.setState({
      opponent: choicesList[Math.ceil(Math.random() * 2)].id,
    })
  }

  concatenateItems = () => {
    const {user, opponent} = this.state
    this.setState(
      {
        win: `${user} ${opponent}`,
      },
      () => {
        this.recordWinners()
      },
    )
  }

  userSelection = item => {
    this.setState(
      {
        user: item,
        viewStatus: true,
      },
      () => {
        this.concatenateItems()
      },
    )
  }

  recordWinners = () => {
    const {win} = this.state
    if (winList.includes(win)) {
      this.setState(pre => ({
        score: pre.score + 1,
        greetText: 'YOU WON',
      }))
    } else if (drawList.includes(win)) {
      this.setState({
        greetText: 'IT IS DRAW',
      })
    } else {
      this.setState(pre => ({
        greetText: 'YOU LOSE',
        score: pre.score - 1,
      }))
    }
  }

  replayGame = () => {
    this.setState({
      viewStatus: false,
    })
    this.randomOpponentPick()
  }

  showRules = () => {
    this.setState({
      viewRules: true,
    })
  }

  closeRules = () => {
    this.setState({
      viewRules: false,
    })
  }

  render() {
    const {score, viewStatus, user, opponent, greetText, viewRules} = this.state
    return (
      <BgContainer>
        <Container>
          <header>
            <h1>Rock Paper Scissors</h1>
            <p>
              Score <br /> {score}
            </p>
          </header>
          {!viewStatus ? (
            <GamePlay pickItem={this.userSelection} />
          ) : (
            <GameResult
              user={user}
              opponent={opponent}
              greetText={greetText}
              rePlay={this.replayGame}
            />
          )}
          <button type="button" onClick={this.showRules}>
            RULES
          </button>
          {viewRules && (
            <Popup open={viewRules}>
              <RuleContainer>
                <RiCloseLine onClick={this.closeRules} />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                  alt="rules"
                />
              </RuleContainer>
            </Popup>
          )}
        </Container>
      </BgContainer>
    )
  }
}

function GamePlay({pickItem}) {
  return (
    <GameContainer>
      <div>
        <button type="button" data-testid="rockButton">
          <img
            onClick={() => {
              pickItem(choicesList[0].id)
            }}
            src={choicesList[0].imageUrl}
            alt={choicesList[0].id}
          />
        </button>
        <button type="button" data-testid="scissorsButton">
          <img
            onClick={() => {
              pickItem(choicesList[1].id)
            }}
            src={choicesList[1].imageUrl}
            alt={choicesList[1].id}
          />
        </button>
      </div>
      <div>
        <button type="button" data-testid="paperButton">
          <img
            onClick={() => {
              pickItem(choicesList[2].id)
            }}
            src={choicesList[2].imageUrl}
            alt={choicesList[2].id}
          />
        </button>
      </div>
    </GameContainer>
  )
}

function GameResult({user, opponent, greetText, rePlay}) {
  const userPick = choicesList.find(item => item.id === user)
  const opponentPick = choicesList.find(item => item.id === opponent)
  return (
    <StatusContainer>
      <ViewStatus>
        <div>
          <p>YOU</p>
          <img src={userPick.imageUrl} alt="your choice" />
        </div>
        <div>
          <p>OPPONENT</p>
          <img src={opponentPick.imageUrl} alt="opponent choice" />
        </div>
      </ViewStatus>
      <p>{greetText}</p>
      <button onClick={rePlay} type="button">
        PLAY AGAIN
      </button>
    </StatusContainer>
  )
}

export default App
