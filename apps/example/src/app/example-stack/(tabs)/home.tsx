import { Button } from '@/components/ Button';
import { Spacer } from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={router.back} text="Go back" />
      <Spacer />
      <Button
        onPress={() => router.navigate('/example-stack/a-stack/a-stack-page-1')}
        text="Go to a stack page 1"
      />
      <Spacer />
      <Button onPress={() => router.navigate('/example-stack/(tabs)/cards')} text="Go to cards" />
    </View>
  );
}
