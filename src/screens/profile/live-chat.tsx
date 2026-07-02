import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import {
  faArrowLeft,
  faPaperclip,
  faPaperPlane,
  faCircleCheck,
  faComments,
  faStar as faStarRegular,
} from '@fortawesome/pro-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/pro-solid-svg-icons';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { theme } from '@theme/index';
import { responsive } from '@theme/responsive';
import Typography from '@theme/typography/typography';
import Icon from '@theme/Icon/icon';
import BlockButton from '@theme/buttons/block-button';
import RemoteImage from '@components/RemoteImage/remote-image';
import type { AppScreenProps } from '@utils/types/navigation';

type Props = AppScreenProps<'LiveChat'>;

type Message = {
  id: string;
  type: 'date' | 'status' | 'joined' | 'sent' | 'received' | 'chat-ended' | 'rating';
  text?: string;
  time?: string;
  avatar?: string;
  initials?: string;
};

const DUMMY_MESSAGES: Message[] = [
  { id: 'date-1', type: 'date', text: 'May 16, 2026' },
  {
    id: 'msg-1',
    type: 'sent',
    text: "Hi, I'm interested in the 2-bedroom apartment in Skyline Residences.",
    time: '6:05 PM PDT',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  { id: 'status-1', type: 'status', text: 'Connecting you to the Agent' },
  { id: 'joined-1', type: 'joined', text: 'Liam Joined the chat', time: '06:07 PM PDT' },
  {
    id: 'msg-2',
    type: 'received',
    text: 'Hello 👋\nThank you for your interest in Skyline Residences.',
    time: '6:07 PM PDT',
    initials: 'LA',
  },
];

const LiveChatScreen = ({ navigation }: Props) => {
  const [message, setMessage]   = useState('');
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [chatEnded, setChatEnded] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const listRef    = useRef<FlatList>(null);
  const sheetRef   = useRef<BottomSheetModal>(null);

  const handleSend = () => {
    if (!message.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'sent', text: message.trim(), time, avatar: 'https://i.pravatar.cc/150?img=12' },
    ]);
    setMessage('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const openEndSheet  = () => sheetRef.current?.present();
  const closeEndSheet = () => sheetRef.current?.dismiss();

  const confirmEndChat = () => {
    closeEndSheet();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { id: 'ended-1', type: 'chat-ended', text: 'Chat Ended', time },
      { id: 'rating-1', type: 'rating' },
    ]);
    setChatEnded(true);
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 200);
  };

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) closeEndSheet();
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<Message>) => {
    if (item.type === 'date') {
      return (
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <View style={styles.datePill}>
            <Typography size={12} color={theme.colors.text_color_light}>{item.text}</Typography>
          </View>
          <View style={styles.separatorLine} />
        </View>
      );
    }

    if (item.type === 'status') {
      return (
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <View style={styles.statusPill}>
            <ActivityIndicator size={14} color={theme.colors.action_blue} />
            <Typography size={12} color={theme.colors.text_color_light}>{item.text}</Typography>
          </View>
          <View style={styles.separatorLine} />
        </View>
      );
    }

    if (item.type === 'joined') {
      return (
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <View style={styles.statusPill}>
            <Icon name={faCircleCheck} size={14} color={theme.colors.Success} />
            <Typography size={12} color={theme.colors.text_color_light}>
              {item.text}{item.time ? ` · ${item.time}` : ''}
            </Typography>
          </View>
          <View style={styles.separatorLine} />
        </View>
      );
    }

    if (item.type === 'chat-ended') {
      return (
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <Typography size={12} color={theme.colors.text_color_light}>
            {item.text}{item.time ? ` · ${item.time}` : ''}
          </Typography>
          <View style={styles.separatorLine} />
        </View>
      );
    }

    if (item.type === 'rating') {
      return (
        <View style={styles.ratingCard}>
          <View style={styles.ratingIconOuter}>
            <Icon name={faComments} size={28} color={theme.colors.action_blue} />
          </View>
          <Typography size={15} weight={theme.fonts.semiBold} marginTop={14} align="center">
            How would you rate services
          </Typography>
          <Typography size={12} color={theme.colors.text_color_light} marginTop={4} align="center">
            1 for poor - 5 for Excellent
          </Typography>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setUserRating(star)} activeOpacity={0.7}>
                <Icon
                  name={star <= userRating ? faStarSolid : faStarRegular}
                  size={28}
                  color={star <= userRating ? '#F59E0B' : theme.colors.grey_100}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (item.type === 'sent') {
      return (
        <View style={styles.sentRow}>
          <View style={styles.sentBubble}>
            <Typography size={15} color={theme.colors.text_color} style={styles.bubbleText}>{item.text}</Typography>
            <Typography size={11} color={theme.colors.text_color_light} style={styles.timestamp}>{item.time}</Typography>
          </View>
          {item.avatar && (
            <RemoteImage uri={item.avatar} style={styles.avatar} showLoader={false} />
          )}
        </View>
      );
    }

    if (item.type === 'received') {
      return (
        <View style={styles.receivedRow}>
          {item.initials ? (
            <View style={styles.initialsAvatar}>
              <Typography size={12} weight={theme.fonts.bold} color={theme.colors.light}>{item.initials}</Typography>
            </View>
          ) : item.avatar ? (
            <RemoteImage uri={item.avatar} style={styles.avatar} showLoader={false} />
          ) : null}
          <View style={styles.receivedBubble}>
            <Typography size={15} color={theme.colors.text_color} style={styles.bubbleText}>{item.text}</Typography>
            <Typography size={11} color={theme.colors.text_color_light} style={styles.timestamp}>{item.time}</Typography>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <View style={styles.backBtn}>
            <Icon name={faArrowLeft} size={16} color={theme.colors.text_color} />
          </View>
        </TouchableOpacity>
        <Typography size={20} weight={theme.fonts.bold}>Live Chat</Typography>
        <TouchableOpacity
          style={[styles.endChatBtn, chatEnded && styles.endChatBtnDisabled]}
          activeOpacity={0.75}
          onPress={openEndSheet}
          disabled={chatEnded}
        >
          <Typography size={14} weight={theme.fonts.medium} color={chatEnded ? theme.colors.grey_500 : theme.colors.text_color}>
            End Chat
          </Typography>
        </TouchableOpacity>
      </View>
      <View style={styles.headerDivider} />

      {/* ── Messages ────────────────────────────────────────── */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* ── Input bar (hidden after chat ends) ──────────────── */}
      {!chatEnded && (
        <View style={styles.inputBar}>
          <View style={styles.inputWrapper}>
            <Icon name={faPaperclip} size={18} color={theme.colors.grey_500} />
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Send a Message"
              placeholderTextColor={theme.colors.grey_500}
              multiline
              onSubmitEditing={handleSend}
            />
          </View>
          <TouchableOpacity style={styles.sendBtn} activeOpacity={0.8} onPress={handleSend}>
            <Icon name={faPaperPlane} size={18} color={theme.colors.light} />
          </TouchableOpacity>
        </View>
      )}

      {/* ── End Chat Bottom Sheet ───────────────────────────── */}
      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing
        enablePanDownToClose
        onChange={handleSheetChange}
        backgroundStyle={styles.sheetBg}
        handleIndicatorStyle={styles.sheetHandle}
      >
        <BottomSheetView style={styles.sheetContent}>
          {/* Icon */}
          <View style={styles.sheetIconOuter}>
            <View style={styles.sheetIconInner}>
              <Icon name={faComments} size={32} color={theme.colors.Success} />
            </View>
          </View>

          <Typography size={20} weight={theme.fonts.bold} align="center" marginTop={20}>
            End Live Chat?
          </Typography>
          <Typography size={14} color={theme.colors.text_color_light} align="center" marginTop={8}>
            Are you sure you want to end live chat?
          </Typography>

          <View style={styles.sheetActions}>
            <BlockButton
              bgColor={theme.colors.grey_50}
              style={styles.sheetBtn}
              onPress={closeEndSheet}
            >
              <Typography size={15} weight={theme.fonts.semiBold} align="center">
                Cancel
              </Typography>
            </BlockButton>
            <BlockButton
              bgColor={theme.colors.black}
              style={styles.sheetBtn}
              onPress={confirmEndChat}
            >
              <Typography size={15} weight={theme.fonts.semiBold} color={theme.colors.light} align="center">
                End Chat
              </Typography>
            </BlockButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </KeyboardAvoidingView>
  );
};

export default LiveChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: responsive(52),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(14),
  },
  backBtn: {
    width: responsive(38),
    height: responsive(38),
    borderRadius: responsive(19),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endChatBtn: {
    paddingHorizontal: responsive(18),
    paddingVertical: responsive(8),
    borderRadius: responsive(30),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
  },
  endChatBtnDisabled: {
    borderColor: theme.colors.grey_100,
  },
  headerDivider: {
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  listContent: {
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(20),
    gap: responsive(12),
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    marginVertical: responsive(4),
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  datePill: {
    backgroundColor: theme.colors.grey_50,
    borderRadius: responsive(20),
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(4),
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(6),
  },
  ratingCard: {
    borderWidth: 1.5,
    borderColor: theme.colors.action_blue,
    borderRadius: responsive(20),
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(24),
    alignItems: 'center',
    marginVertical: responsive(4),
  },
  ratingIconOuter: {
    width: responsive(64),
    height: responsive(64),
    borderRadius: responsive(32),
    backgroundColor: `${theme.colors.action_blue}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: responsive(8),
    marginTop: responsive(16),
  },
  sentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: responsive(8),
  },
  sentBubble: {
    backgroundColor: '#E8E8F5',
    borderRadius: responsive(18),
    borderBottomRightRadius: responsive(4),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(12),
    maxWidth: '75%',
  },
  receivedRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: responsive(8),
  },
  initialsAvatar: {
    width: responsive(32),
    height: responsive(32),
    borderRadius: responsive(16),
    backgroundColor: theme.colors.action_blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receivedBubble: {
    backgroundColor: '#E8E8F5',
    borderRadius: responsive(18),
    borderBottomLeftRadius: responsive(4),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(12),
    maxWidth: '75%',
  },
  bubbleText: {
    lineHeight: responsive(22),
  },
  timestamp: {
    marginTop: responsive(6),
    textAlign: 'right',
  },
  avatar: {
    width: responsive(32),
    height: responsive(32),
    borderRadius: responsive(16),
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(12),
    paddingBottom: responsive(28),
    backgroundColor: theme.colors.background,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    borderWidth: 1.5,
    borderColor: theme.colors.borderColor,
    borderRadius: responsive(30),
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(12),
    backgroundColor: theme.colors.background,
  },
  input: {
    flex: 1,
    fontSize: responsive(15),
    color: theme.colors.text_color,
    fontFamily: theme.fonts.regular,
    padding: 0,
    maxHeight: responsive(100),
  },
  sendBtn: {
    width: responsive(48),
    height: responsive(48),
    borderRadius: responsive(24),
    backgroundColor: theme.colors.action_blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBg: {
    backgroundColor: theme.colors.light,
    borderRadius: responsive(28),
  },
  sheetHandle: {
    backgroundColor: theme.colors.grey_100,
    width: responsive(40),
  },
  sheetContent: {
    paddingHorizontal: responsive(24),
    paddingTop: responsive(8),
    paddingBottom: responsive(36),
    alignItems: 'center',
  },
  sheetIconOuter: {
    width: responsive(100),
    height: responsive(100),
    borderRadius: responsive(50),
    backgroundColor: `${theme.colors.Success}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsive(8),
  },
  sheetIconInner: {
    width: responsive(70),
    height: responsive(70),
    borderRadius: responsive(35),
    backgroundColor: `${theme.colors.Success}25`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetActions: {
    flexDirection: 'row',
    gap: responsive(12),
    marginTop: responsive(28),
    width: '100%',
  },
  sheetBtn: {
    flex: 1,
    borderRadius: responsive(14),
  },
});
