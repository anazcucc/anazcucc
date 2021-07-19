import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.title}>En que quieres enfocarte hoy?</Text>
        <View style={styles.inputcontainer}>
          <TextInput style={{flex: 1, marginRight: spacing.md}} onSubmitEditing={({nativeEvent}) => {setSubject(nativeEvent.text)}}></TextInput>
          <RoundedButton size={50} title="+" onPress={() => { addSubject(subject)}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innercontainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputcontainer: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: 'center'
  },
});
