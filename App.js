import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/feature/Focus';
import { Timer } from './src/feature/Timer';
import { colors } from './src/utils/colors';
import { FocusHistory } from './src/feature/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage'

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2,
}
export default function App() {
  console.log('test git1');
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  
  const addFocusHistorySubjectWithState = (subject, status) => {
      setFocusHistory([...focusHistory, {subject, status}])
  }
  
  const onClear = () => {
    setFocusHistory([]);
  }
  
  const saveFocusHistory = async () => {
   try {
     AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
   } catch (e) {
     console.log(e);
   }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    } catch (e){
      console.log(e);
    }
  }
  
  useEffect(() => {
    loadFocusHistory();
  },[])

  useEffect(() => {
    saveFocusHistory();
  },[focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          newFocusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.COMPLETE)
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUS.CANCELLED)
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex:1 }}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
    paddingTop: Platform.OS == 'ios' ? 16 : 24,
  },
});
