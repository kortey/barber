import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from 'expo-image-picker';

export default function BarberProfileScreen() {
  const [profile, setProfile] = useState({
    fullName: 'Mike Johnson',
    phone: '+1 (555) 234-5678',
    email: 'mike.j@elitebarbers.com',
    bio: 'Professional barber with 8+ years of experience specializing in modern cuts and classic styles.',
    skills: 'Fades, Beard Trim, Hot Towel Shave, Hair Design',
    profilePic: 'https://example.com/profile.jpg'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfile(prev => ({
        ...prev,
        profilePic: result.assets[0].uri
      }));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profile.profilePic }}
              style={styles.profileImage}
              defaultSource={require('@/assets/images/icon.png')}
            />
            <TouchableOpacity onPress={pickImage} style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color={Colors.dark.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.fullName}
              onChangeText={(text) => setProfile(prev => ({ ...prev, fullName: text }))}
              placeholderTextColor={Colors.dark.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Phone Number</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
              placeholderTextColor={Colors.dark.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email (Optional)</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.dark.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Bio</ThemedText>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={profile.bio}
              onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.dark.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Skills & Specialties</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.skills}
              onChangeText={(text) => setProfile(prev => ({ ...prev, skills: text }))}
              placeholder="e.g., Fade, Beard Trim (comma separated)"
              placeholderTextColor={Colors.dark.textSecondary}
              editable={isEditing}
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setIsEditing(true)}
          >
            <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.changePasswordButton}>
          <ThemedText style={styles.changePasswordText}>Change Password</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.dark.primary,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.dark.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.dark.cardSurface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.dark.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.1)',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(203, 213, 225, 0.1)',
  },
  saveButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  editButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  changePasswordButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.primary,
  },
  changePasswordText: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});