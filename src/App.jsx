// import { Component } from 'react'; // for class component

import { useState, useEffect } from 'react'; // for functional component

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('') //[value, setValue]
  const [monsters, setMonsters] = useState([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(()=>{  //callbeck, array of dependencys
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => setMonsters(users))
  }, []) // array is emty cuz we never want to call callback fun 

  useEffect(() => { // radimo kako bi sprecili ponovno filtriranje ukoliko monsters i search field nisu promenjeni
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    })

    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase()
    setSearchField(searchFieldString)
  }

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange} 
                  placeholder='Search monsters'
                  className='monsters-search-box'/>
      <CardList monsters={filteredMonsters}/> 
      
    </div>
  )
}

// class App extends Component {
//   constructor(){
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   // LIFE CYCLE
//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then((users) => this.setState(() => {
//       return {monsters: users}
//     }))
//   }

//   // FUNKCIJE
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase()
//     this.setState(() => {
//       return { searchField }
//     })
//   }

//   // RENDER
//   render(){
//     const { monsters, searchField } = this.state
//     const { onSearchChange } = this

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField)
//     })

//     return (
//       <div>
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler={onSearchChange} 
//                    placeholder='Search monsters'
//                    className='monsters-search-box'/>
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     )
//   }
// }

export default App;
