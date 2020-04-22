import React from 'react'
import Modal from './ModalWindow'

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hits: [],
      page: 0,
      isModalShow: false,
      indexOfHit: null
    }

  }

  componentDidMount() {
    this.getData()
    setInterval(() => this.getData(), 10000)
  }

  getData() {
    const { page } = this.state
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          hits: [...this.state.hits, ...data.hits],
          page: data.page + 1
        })
      })
  }

  showModal(index) {
    console.log(index)
    this.setState({
      isModalShow: true,
      indexOfHit: index,
    })
  }

  onClose() {
    this.setState({
      isModalShow: false,
    })
  }

  render() {
    const { hits, isModalShow, indexOfHit } = this.state
    // console.log(hits)
    return (
      <>
        {isModalShow &&
          <Modal
            data={hits[indexOfHit]}
            close={() => this.onClose()} />
        }
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Created at</th>
              <th>Author</th>
            </tr>
            {hits.map((item, index) => {
              return (
                <tr key={index} onClick={() => this.showModal(index)}>
                  <td>{item.title}</td>
                  <td>{item.url}</td>
                  <td>{item.created_at}</td>
                  <td>{item.author}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </>
    )
  }
}

export default List;