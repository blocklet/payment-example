import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { CheckoutDonate } from '@blocklet/payment-react';
import { CurrencyBitcoin, SentimentSatisfiedOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types'; // Add this line

// 假设的文章数据
const article = {
  title: '示例文章标题',
  content: '这里是文章内容。这篇文章讨论了如何使用 MUI 创建一个类似掘金的评论功能。',
};

// 假设的评论数据
const initialComments = [
  { id: 1, text: '这是第一个评论。' },
  { id: 2, text: '这是第二个评论。' },
];

export default function ArticleWithComments({ variant = 'avatar' }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitComment = () => {
    const nextId = comments.length + 1;
    setComments([...comments, { id: nextId, text: newComment }]);
    setNewComment(''); // 清空输入框
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {article.content}
          </Typography>
        </CardContent>
      </Card>
      <Box p={2}>
        <CheckoutDonate
          livemode={false}
          settings={{
            target: 'donation-test-custom-only',
            title: 'Donation Test: Custom Only',
            description: 'Just a test for donation with presets',
            reference: window.location.href,
            beneficiaries: [
              {
                address: 'z1bwRy5qayB6aNbxMoEH4kmhjSoqnJZh4Ef',
                share: '64',
              },
              {
                address: 'z1VfYx6w2ErHJuu4mycKZr7Go6NyEeGZaJS',
                share: '32',
              },
            ],
            amount: {
              minimum: '0.01',
              maximum: '100',
              custom: true,
            },
            appearance: {
              button: {
                text: 'Support Developer',
                icon: <CurrencyBitcoin />,
                color: 'error',
                variant: 'outlined',
              },
              history: {
                variant,
              },
            },
          }}
        />
      </Box>

      <Box component="form" sx={{ mt: 2 }}>
        <TextField fullWidth label="添加评论" variant="outlined" value={newComment} onChange={handleCommentChange} />
        <Button sx={{ mt: 2 }} variant="contained" onClick={submitComment}>
          提交评论
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment.text} />
            <CheckoutDonate
              livemode={false}
              mode="inline"
              settings={{
                target: `donation-test-at-article-comment ${comment.id}`,
                title: `Donation Test: article-comment ${comment.id}`,
                description: 'Just a test for donation with presets',
                reference: window.location.href,
                beneficiaries: [
                  {
                    address: 'z1bwRy5qayB6aNbxMoEH4kmhjSoqnJZh4Ef',
                    share: '64',
                  },
                  {
                    address: 'z1VfYx6w2ErHJuu4mycKZr7Go6NyEeGZaJS',
                    share: '32',
                  },
                ],
                amount: {
                  minimum: '0.01',
                  maximum: '100',
                  custom: true,
                },
                appearance: {
                  button: {
                    text: '打赏',
                    icon: <SentimentSatisfiedOutlined />,
                    color: 'primary',
                    variant: 'text',
                  },
                  history: {
                    variant: 'avatar',
                  },
                },
              }}
              inlineOptions={{
                button: {
                  text: 'Support Developer',
                  icon: <CurrencyBitcoin />,
                  color: 'primary',
                  variant: 'contained',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

ArticleWithComments.propTypes = {
  variant: PropTypes.string.isRequired,
};
