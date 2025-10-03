import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TextInput, ScrollView, 
  Image, Dimensions, TouchableOpacity, Button, Platform,
} from 'react-native';
import * as Speech from 'expo-speech';



const ISL_IMAGES = {
  'A': require('./assets/A.jpeg'),
  'B': require('./assets/B.jpeg'),
  'C': require('./assets/C.jpeg'),
  'D': require('./assets/D.jpeg'),
  'E': require('./assets/E.jpeg'),
  'F': require('./assets/F.jpeg'),
  'G': require('./assets/G.jpeg'),
  'H': require('./assets/H.jpeg'),
  'I': require('./assets/I.jpeg'),
  'J': require('./assets/J.jpeg'),
  'K': require('./assets/K.jpeg'),
  'L': require('./assets/L.jpeg'),
  'M': require('./assets/M.jpeg'),
  'N': require('./assets/N.jpeg'),
  'O': require('./assets/O.jpeg'),
  'P': require('./assets/P.jpeg'),
  'Q': require('./assets/Q.jpeg'),
  'R': require('./assets/R.jpeg'),
  'S': require('./assets/S.jpeg'),
  'T': require('./assets/T.jpeg'),
  'U': require('./assets/U.jpeg'),
  'V': require('./assets/V.jpeg'),
  'W': require('./assets/W.jpeg'),
  'X': require('./assets/X.jpeg'),
  'Y': require('./assets/Y.jpeg'),
  'Z': require('./assets/Z.jpeg'),
};
const APP_LOGO = require ('./assets/app_logo.png');


export default function App() {
  const [inputText, setInputText] = useState('');
  const [activeScreen, setActiveScreen] = useState('text-to-sign');
  const [selectedLetter, setSelectedLetter] = useState('');
  
  //image sizing
  const screenWidth = Dimensions.get('window').width;
  const signSize = screenWidth / 4;

  //SIGN-TO-VOICE-1
  const handleSpeakLetter = (letter) => {
    setSelectedLetter(letter);
    //device's built-in text-to-speech
    if (Platform.OS === 'web') {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(letter));
    } else {
      Speech.speak(letter, { language: 'en-IN' });
    }
  };

  //Speaks the entire word
  const handleSpeakWord = () => {
    const wordToSpeak = inputText;
    if (wordToSpeak.trim().length > 0) {
      if (Platform.OS === 'web') {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(wordToSpeak));
      } else {
        Speech.speak(wordToSpeak, { language: 'en-IN' });
      }
    }
  };


  const renderWordSeparator = (index) => {
    return <View key={`space_sep_${index}`} style={styles.wordSeparator} />;
  };

  //TEXT-TO-SIGN
  const renderSign = (letter) => {
  if (!ISL_IMAGES[letter]) {
    return null;
  }

  
  //image display in TouchableOpacity
  return (
    <TouchableOpacity 
      key={letter}
      style={[styles.signImageContainer, { width: signSize, height: signSize }]}
      onPress={() => handleSpeakLetter(letter)} 
    >
      <Image
        source={ISL_IMAGES[letter]}
        style={styles.signImage}
      />
    </TouchableOpacity>
  );
};

  const renderTextToSignScreen = () => (
    <View style={styles.screen}>
     <View style={styles.logoContainer}>
        <Image source={APP_LOGO} style={styles.logoImage} />
      </View>
      <Text style={styles.header}>SpeakISL</Text>
      <Text style={styles.subHeader}>Type a word to see its signs.</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a word here..."
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
         <TouchableOpacity style={styles.speakButton}
      onPress={() => handleSpeakWord()} 
    >
        <Text style={styles.speakButtonText}>
           Speak Word
        </Text>
    </TouchableOpacity>
      </View>
      <View style={styles.signDisplayContainer}>
        {inputText.length > 0 ? (
          <ScrollView contentContainerStyle={styles.fingerSpellingContainer}>
            {inputText.toUpperCase().split('').map((letter,index) => {
              if (letter === ' ') {
                return renderWordSeparator(index); 
              }
              if (ISL_IMAGES[letter]) {
                return (
                  <View key={index}> 
                    {renderSign(letter)}
                  </View>
                );
              }
            })}
          </ScrollView>
        ) : (
          <Text style={styles.placeholder}>Signs will appear here...</Text>
        )}
      </View>
    </View>
  );

  //SIGN-TO-VOICE-2
  const renderSignToTextScreen = () => (
    <View style={styles.screen}>
    <View style={styles.logoContainer}>
      <Image source={APP_LOGO} style={styles.logoImage} />
    </View>
      <Text style={styles.header}>Sign-to-Voice Mode</Text>
      <Text style={styles.subHeader}>Tap a sign to hear the letter.</Text>
      <ScrollView contentContainerStyle={styles.signGrid}>
        {Object.keys(ISL_IMAGES).map((letter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.signGridItem, { width: signSize, height: signSize }]}
            onPress={() => handleSpeakLetter(letter)}
          >
            <Image source={ISL_IMAGES[letter]} style={styles.signImageGrid} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedLetter ? (
        <Text style={styles.spokenWord}>Speaking: {selectedLetter}</Text>
      ) : (
        <Text style={styles.placeholder}>Tap a sign to hear a letter...</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {activeScreen === 'text-to-sign' ? renderTextToSignScreen() : renderSignToTextScreen()}
      
      <View style={styles.switchButtonContainer}>
        <Button
          title={`Switch to ${activeScreen === 'text-to-sign' ? 'Sign-to-Voice' : 'Text-to-Sign'} Mode`}
          onPress={() => setActiveScreen(activeScreen === 'text-to-sign' ? 'sign-to-text' : 'text-to-sign')}
          color="#f5a134f9"
        />
      </View>
      <Text style={styles.attributionText}>
        Disclaimer: This is a non-commercial, educational prototype. Sign images are from a public domain dataset for demonstration purposes.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor:'#E8F5E9',
    },
    inputContainer:{
      display:'flex',
      flexDirection:'row',
      alignContent: 'flex-start',
      justifyContent:'space-between',
      width:'100%',
      gap:10,
    },
    speakButton: {
      width: 75,
      height: '50',
      textAlign:'center',
    backgroundColor: '#FFC107',
    borderColor : '#FFC107',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth:1,
    },
    speakButtonText: {
      width: '100%',
      height: 'auto',
      padding: 5,
      textAlign: 'center'
    },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  logoContainer: {
    
    marginTop: 10,
    marginBottom:10,
    display:'flex'
  },  
  logoImage: {
  width: '200',
  height: '70',
  resizeMode: 'contain',
  },



  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#38b00dff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ff8800ff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    flex:1,
    color:'#1f1f1fff'
  },
  signDisplayContainer: {
    flex: 1,
    width: '100%',
    minHeight: 200,
    backgroundColor: '#c4e1f9ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fingerSpellingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },

  signImageContainer: {
    overflow: 'hidden',
    margin: 2,
    backgroundColor: '#ffffffff',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2a9005ff',
    padding: 20,
  },
  // --- Sign Grid Styles ---
  signGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  signGridItem: {
    margin: 5,
    backgroundColor: '#ffffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signImageGrid: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  spokenWord: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  space: {
    width: 20,
  },
  switchButtonContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  attributionText: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
   wordSeparator:{
    width:'100%', 
    height:10,
    flexBasis: '100%',
  },
});
