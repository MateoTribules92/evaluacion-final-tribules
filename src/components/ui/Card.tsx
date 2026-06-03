import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cardStyles } from '../../styles/appStyle';
import { Post } from '../../types/api';

interface CardProps {
  post: Post;
  onPress: () => void;
}

export const Card = ({ onPress, post }: CardProps) => {
  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={cardStyles.header}>
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>#{post.id}</Text>
        </View>
        <Text style={cardStyles.userId}>Usuario {post.userId}</Text>
      </View>
      <Text style={cardStyles.title} numberOfLines={2}>{post.tittle}</Text>
      <Text style={cardStyles.body} numberOfLines={3}>{post.body}</Text>
    </TouchableOpacity>
  );
};


