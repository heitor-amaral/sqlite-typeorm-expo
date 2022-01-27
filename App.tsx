import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import TodoList from './src/components/TodoList';
import { DatabaseConnectionProvider } from './src/data/connection';

const App: React.FC = () => {
  return (
    <DatabaseConnectionProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <TodoList />
      </SafeAreaView>
    </DatabaseConnectionProvider>
  );
};

export default App;