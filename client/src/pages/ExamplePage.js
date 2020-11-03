import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class ExamplePage extends Component {
  constructor() {
    super()
    this.state = {}
    this.getTopics = this.getTopics.bind(this)
    this.getTopic = this.getTopic.bind(this)
  }

  componentDidMount() {
    this.getTopics()
  }

  async fetch(endpoint) {
    try {
      const response = await window.fetch(endpoint)
      return await response.json()
    } catch (error) {
      return console.log(error)
    }
  }

  getTopics() {
    this.fetch('/api/topics')
      .then(topics => {
        if (topics.length > 0 ) {
          this.setState({ topics: topics })
          this.getTopic(topics[0].id)
        } else {
          this.setState({ topics: [] })
        }
      })
  }

  getTopic(id) {
    this.fetch(`/api/topics/${id}`)
      .then(topic => this.setState({ topic: topic }))
  }

  render() {
    let { topics, topic } = this.state
    return topics
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            Topics and Questions
          </Header.Content>
        </Header>
        <Divider hidden section />
        {topics && topics.length
          ? <Button.Group color='teal' fluid widths={topics.length}>
            {Object.keys(topics).map((key) => {
              return <Button active={topic && topic.id === topics[key].id} fluid key={key} onClick={() => this.getTopic(topics[key].id)}>
                {topics[key].title}
              </Button>
            })}
          </Button.Group>
          : <Container textAlign='center'>No topics found.</Container>
        }
        <Divider section />
        {topic &&
          <Container>
            <Header as='h2'>{topic.title}</Header>
            {topic.description && <p>{topic.description}</p>}
            {topic.questions &&
              <Segment.Group>
                {topic.questions.map((question, i) => <Segment key={i}>{question.title}</Segment>)}
              </Segment.Group>
            }
          </Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default ExamplePage;