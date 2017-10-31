-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 10.30.84.172:3306
-- Generation Time: Oct 11, 2017 at 08:36 PM
-- Server version: 5.6.36-82.0-56-log
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toasthabit`
--

-- --------------------------------------------------------

--
-- Table structure for table `CategoryDeets`
--

CREATE TABLE `CategoryDeets` (
  `ID` int(11) NOT NULL,
  `Category` varchar(30) NOT NULL,
  `Completion_Points` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Reward_ID` int(11) NOT NULL,
  `Marker_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Marker`
--

CREATE TABLE `Marker` (
  `ID` int(11) NOT NULL,
  `Title` varchar(30) NOT NULL,
  `Latitude` int(11) NOT NULL,
  `Longitude` int(11) NOT NULL,
  `Radius` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Rewards`
--

CREATE TABLE `Rewards` (
  `ID` int(11) NOT NULL,
  `Title` varchar(30) NOT NULL,
  `Photo_Url` varchar(50) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Tasks`
--

CREATE TABLE `Tasks` (
  `ID` int(11) NOT NULL,
  `Title` varchar(30) NOT NULL,
  `Description` text NOT NULL,
  `Completion` int(11) NOT NULL,
  `Start` date NOT NULL,
  `End` date NOT NULL,
  `Frequency` int(11) NOT NULL,
  `Days` varchar(100) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Category_ID` int(11) NOT NULL,
  `Marker_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Hash_Password` varchar(100) NOT NULL,
  `Photo_Url` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CategoryDeets`
--
ALTER TABLE `CategoryDeets`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Marker`
--
ALTER TABLE `Marker`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Rewards`
--
ALTER TABLE `Rewards`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Tasks`
--
ALTER TABLE `Tasks`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CategoryDeets`
--
ALTER TABLE `CategoryDeets`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Marker`
--
ALTER TABLE `Marker`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Rewards`
--
ALTER TABLE `Rewards`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Tasks`
--
ALTER TABLE `Tasks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
