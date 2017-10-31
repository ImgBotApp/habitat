import { StackNavigator } from 'react-navigation';
import Ecosystem from './EcoSystem';
import TaskBuilder from '../Tasks/TaskBuilder'

export default HomeTaskAdd = StackNavigator({
  Ecosystem: { screen: Ecosystem },
  TaskBuilder: { screen: TaskBuilder }
});
